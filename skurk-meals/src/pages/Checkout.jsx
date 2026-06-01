import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import OrderLoading from "../components/checkout/OrderLoading";

import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    deliveryDay: "Måndag",
    paymentMethod: "Swish",
  });

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Namn krävs";
    if (!formData.email.trim()) newErrors.email = "Email krävs";
    if (!formData.phone.trim()) newErrors.phone = "Mobilnummer krävs";
    if (!formData.address.trim()) newErrors.address = "Adress krävs";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postnummer krävs";
    if (!formData.city.trim()) newErrors.city = "Stad krävs";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    console.log("Kunduppgifter:", formData);
    console.log("Varukorg:", cartItems);
    console.log("Total:", cartTotal);

    const orderData = {
      customer: formData,
      items: cartItems,
      total: cartTotal,
    };

    

    setIsSubmitting(true);

    setTimeout(() => {

    clearCart();

    navigate("/confirmation", {
      state: {
        order: orderData,
      },
    });
  }, 5000);
}

    if (isSubmitting) {
  return (
    <main className="checkout-page">
      <OrderLoading />
    </main>
  );
}

  return (
    <main className="checkout-page">
      <section className="checkout-header">
        <h1>Checkout</h1>
        <p>Fyll i dina uppgifter och välj leveransdag.</p>
      </section>

      <div className="checkout-content">
        <CheckoutForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <CheckoutSummary />
      </div>
    </main>
  );
}

export default Checkout;