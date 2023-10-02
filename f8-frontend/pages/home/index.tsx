// import "./Home.scss";
import Image from "next/image";
import logoImg from "assets/logo.png";
import Link from "next/link";


const Home:any = () => {
  return (
    <>
      <a href="https://discord.com/invite/vUUEXDfKVE">
        <span className="btn-help">Help</span>
      </a>
      <div className="vertical-center">
        <section className="container text-center landing-page">
          <Image src={logoImg} alt="Auth" className="mb-5"/>
          <p className="mb-5">We identify your ideal customer & create personalized content for them automatically</p>
          <div className="d-grid gap-2">
              <Link href="/auth/login" className="btn btn-purple">
                Sign in
              </Link>
              <Link href="/auth/register">Sign Up</Link>
          </div>
        </section>
      </div>
    </>
  );
} ;

export default Home;
