import { Link } from "react-router-dom";

export default function PaymentCancel() {
  return (
    <div className="lux-card p-8 text-center">
      <h1 className="text-4xl font-black">Payment Cancelled</h1>
      <p className="text-white/60 mt-3">
        Payment was cancelled. You can try again anytime.
      </p>
      <div className="mt-6 flex justify-center gap-3 flex-wrap">
        <Link to="/book-room" className="lux-btn">Try Again</Link>
        <Link to="/" className="lux-btn-dark">Home</Link>
      </div>
    </div>
  );
}
