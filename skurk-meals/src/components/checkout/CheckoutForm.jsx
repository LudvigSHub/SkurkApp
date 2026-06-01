function CheckoutForm({ formData, errors, onChange, onSubmit }) {
  return (
    <form className="checkout-form" onSubmit={onSubmit}>
      <h2>Kunduppgifter</h2>

      <label>
        Namn
        <input
          className={errors.name ? "input-error" : ""}
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </label>

      <label>
        Email
        <input
          className={errors.email ? "input-error" : ""}
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </label>

      <label>
        Mobilnummer
        <input
          className={errors.phone ? "input-error" : ""}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
        />
        {errors.phone && <span className="form-error">{errors.phone}</span>}
      </label>

      <h2>Leverans</h2>

      <label>
        Adress
        <input
          className={errors.address ? "input-error" : ""}
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
        />
        {errors.address && <span className="form-error">{errors.address}</span>}
      </label>

      <label>
        Postnummer
        <input
          className={errors.postalCode ? "input-error" : ""}
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={onChange}
        />
        {errors.postalCode && (
          <span className="form-error">{errors.postalCode}</span>
        )}
      </label>

      <label>
        Stad
        <input
          className={errors.city ? "input-error" : ""}
          type="text"
          name="city"
          value={formData.city}
          onChange={onChange}
        />
        {errors.city && <span className="form-error">{errors.city}</span>}
      </label>

      <div className="checkout-radio-group">
        <p>Leveransdag</p>

        <label>
          <input
            type="radio"
            name="deliveryDay"
            value="Måndag"
            checked={formData.deliveryDay === "Måndag"}
            onChange={onChange}
          />
          Måndag
        </label>

        <label>
          <input
            type="radio"
            name="deliveryDay"
            value="Onsdag"
            checked={formData.deliveryDay === "Onsdag"}
            onChange={onChange}
          />
          Onsdag
        </label>
      </div>

      <div className="checkout-radio-group">
        <p>Betalningsmetod</p>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Swish"
            checked={formData.paymentMethod === "Swish"}
            onChange={onChange}
          />
          Swish
        </label>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Kort"
            checked={formData.paymentMethod === "Kort"}
            onChange={onChange}
          />
          Kort
        </label>
      </div>

      <button className="button button-primary" type="submit">
        Beställ
      </button>
    </form>
  );
}

export default CheckoutForm;