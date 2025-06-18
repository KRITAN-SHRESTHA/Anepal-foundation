// import { OnApproveData } from '@paypal/paypal-js';
// import {
//   PayPalHostedField,
//   PayPalHostedFieldsProvider,
//   usePayPalHostedFields
// } from '@paypal/react-paypal-js';
// import { useEffect } from 'react';

// interface CustomCard {
//   createOrder: () => Promise<string>;
//   onApprove: (data: OnApproveData) => Promise<void>;
// }

// export default function CustomCard({ createOrder }: CustomCard) {
//   return (
//     <PayPalHostedFieldsProvider
//       createOrder={createOrder}
//       styles={{
//         '.valid': { color: '#28a745' },
//         '.invalid': { color: '#dc3545' }
//       }}
//     >
//       <PayPalHostedField
//         id="card-number"
//         className="card-field"
//         hostedFieldType="number"
//         options={{
//           selector: '#card-number',
//           placeholder: '4111 1111 1111 1111'
//         }}
//       />
//       <PayPalHostedField
//         id="cvv"
//         className="card-field"
//         hostedFieldType="cvv"
//         options={{
//           selector: '#cvv',
//           placeholder: '123',
//           maskInput: {
//             character: '#'
//           }
//         }}
//       />
//       <PayPalHostedField
//         id="expiration-date"
//         className="card-field"
//         hostedFieldType="expirationDate"
//         options={{
//           selector: '#expiration-date',
//           placeholder: 'MM/YYYY'
//         }}
//       />

//       <SubmitPayment />
//     </PayPalHostedFieldsProvider>
//   );
// }

// const SubmitPayment = ({ isPaying }: { isPaying: boolean }) => {
//   const hostedFields = usePayPalHostedFields();
//   console.log('hostedFields', hostedFields);

//   useEffect(() => {
//     return () => {
//       console.log('cleanup');
//       // Cleanup when component unmounts
//       // if (hostedFields.cardFields) {
//       hostedFields?.cardFields?.teardown().catch(err => {
//         console.error('Error tearing down PayPal Hosted Fields:', err);
//       });
//     };
//     // };
//   }, []);

//   const handleClick = async () => {
//     // if (!cardFieldsForm) {
//     //   const childErrorMessage =
//     //     'Unable to find any child components in the <PayPalCardFieldsProvider />';
//     //   throw new Error(childErrorMessage);
//     // }
//     // const formState = await cardFieldsForm.getState();
//     // console.log('formState', formState);
//     // if (!formState.isFormValid) {
//     //   return alert('The payment form is invalid');
//     // }
//     // setIsPaying(true);
//   };

//   return (
//     <button
//       className={isPaying ? 'btn' : 'btn btn-primary'}
//       style={{ float: 'right' }}
//       onClick={handleClick}
//     >
//       {isPaying ? <div className="spinner tiny" /> : 'Pay'}
//     </button>
//   );
// };
