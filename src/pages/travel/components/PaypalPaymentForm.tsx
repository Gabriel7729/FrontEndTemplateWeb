import React, { useEffect } from "react";

interface PayPalPaymentFormProps {
  orderNumber: string;
  firstName: string;
  lastName: string;
  strDireccion: string;
  totalPayment: number;
}

const PayPalPaymentForm: React.FC<PayPalPaymentFormProps> = ({
  orderNumber,
  firstName,
  lastName,
  strDireccion,
  totalPayment,
}) => {
  useEffect(() => {
    const form = document.createElement("form");
    form.setAttribute("name", "frmsubmit");
    form.setAttribute("action", "https://www.paypal.com/cgi-bin/webscr");
    form.setAttribute("method", "post");

    const fields = [
      { name: "cmd", value: "_xclick" },
      { name: "business", value: "ccomas@gmail.com" },
      { name: "currency_code", value: "USD" },
      { name: "item_name", value: "Viaje a Puerto Rico" },
      { name: "item_number", value: orderNumber },
      { name: "custom", value: "" },
      { name: "image_url", value: "https://www.jetblue.com/magnoliapublic/dam/logo/Supernav-Logos/Supernav_Jetblue.svg" },
      { name: "return", value: "http://localhost:5173/travels" },
      { name: "notify_url", value: "https%3A//www.superplazas.com/masterpages/default.aspx" },
      { name: "no_note", value: "1" },
      { name: "no_shipping", value: "1" },
      { name: "rm", value: "5" },
      { name: "first_name", value: firstName },
      { name: "last_name", value: lastName },
      { name: "address1", value: strDireccion },
      { name: "zip", value: "N/A" },
      { name: "amount", value: totalPayment.toFixed(2) }, // total
    ];

    fields.forEach(({ name, value }) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", name);
      input.setAttribute("value", value);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }, [orderNumber, firstName, lastName, strDireccion, totalPayment]);

  return (
    <div>
      <p>Redirecting to PayPal...</p>
    </div>
  );
};

export default PayPalPaymentForm;
