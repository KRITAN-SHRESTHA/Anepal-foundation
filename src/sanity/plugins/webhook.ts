import { definePlugin, DocumentActionComponent } from 'sanity';

interface WebhookConfig {
  url: string;
  secret: string;
}

export const webhookPlugin = definePlugin<WebhookConfig>(config => {
  const { url, secret } = config;

  return {
    name: 'sanity-plugin-webhook',
    document: {
      actions: (prev: DocumentActionComponent[]) => {
        return prev.map(originalAction => {
          if (
            ['publish', 'unpublish', 'delete'].includes(
              originalAction.name || ''
            )
          ) {
            return async props => {
              const result = await originalAction(props);

              if (result && 'onHandle' in result) {
                const originalOnHandle = result.onHandle;

                result.onHandle = async () => {
                  const originalResult = await originalOnHandle?.();

                  // Only trigger webhook for blogs and stories
                  if (['blogs', 'stories'].includes(props.type)) {
                    try {
                      await fetch(url, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${secret}`
                        },
                        body: JSON.stringify({
                          _type: props.type,
                          _id: props.id,
                          action: originalAction.name
                        })
                      });
                    } catch (error) {
                      console.error('Error triggering webhook:', error);
                    }
                  }

                  return originalResult;
                };
              }

              return result;
            };
          }
          return originalAction;
        });
      }
    }
  };
});
