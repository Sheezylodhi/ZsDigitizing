import ResetPasswordClient from "@/components/ResetPasswordClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <Navbar />
      <ResetPasswordClient />
      <Footer />
    </>
  );
}