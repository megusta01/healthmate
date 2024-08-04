import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center">
          Bem-vindo ao Healthmate
        </h1>
        <p className="text-center mt-4">
          O Healthmate é um aplicativo que ajuda você a cuidar da sua saúde.
        </p>
      </main>
      <Footer />
    </>
  );
}
