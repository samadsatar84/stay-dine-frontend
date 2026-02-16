import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="lux-card p-8 text-center">
      <h1 className="text-4xl font-black lux-gold">Payment Successful ✅</h1>
      <p className="text-white/60 mt-3">
        Thank you! Your payment was completed successfully.
      </p>
      <div className="mt-6 flex justify-center gap-3 flex-wrap">
        <Link to="/rooms" className="lux-btn-dark">Back to Rooms</Link>
        <Link to="/" className="lux-btn">Home</Link>
      </div>
    </div>
  );
}
