import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";
import { useAuth } from "../context/AuthContext";

import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import OrderLoading from "../components/checkout/OrderLoading";

import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
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

  // Om användaren är inloggad, förifyll namn och email i checkout-formuläret
  useEffect(() => {
    if (!user) {
      return;
    }
    
    setFormData((prevData) => ({
      ...prevData,
      name: prevData.name || user.name || user.username || "",
      email: prevData.email || user.email || "",
    }));
  }, [user]);

  // simpel validering
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


  // Hantera ändringar i formuläret 
  // rensa eventuella valideringsfel för det fältet som ändras
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

  async function handleSubmit(e) {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

   

  const orderData = {
    customer: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      postalCode: formData.postalCode,
      city: formData.city,
    },
    deliveryDay: formData.deliveryDay,
    paymentMethod: formData.paymentMethod,
    items: cartItems.map((item) => ({
      productId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      kcal: item.kcal,
      protein: item.protein,
    })),
    totalPrice: cartTotal,
  };

  try {
    setIsSubmitting(true);

    await createOrder(orderData);

    setTimeout(() => {
      clearCart();

      navigate("/confirmation", {
        state: {
          order: orderData,
        },
      });
    }, 5000);
  } catch (error) {
    setIsSubmitting(false);

    setErrors((prevErrors) => ({
      ...prevErrors,
      submit: "Kunde inte skapa ordern. Testa igen.",
    }));
  }
}

if (cartItems.length === 0 && !isSubmitting) {
  return (
    <main className="checkout-page">
      <section className="checkout-empty">
        <h1>Din varukorg är tom</h1>
        <p>
          Du behöver lägga till minst en matlåda innan du kan gå vidare till checkout.
        </p>

        <div className="checkout-empty-actions">
          <Link to="/menu" className="button button-primary">
            Till menyn
          </Link>

          <Link to="/cart" className="button button-secondary">
            Till varukorgen
          </Link>
        </div>
      </section>
    </main>
  );
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