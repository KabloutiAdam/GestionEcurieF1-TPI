import Background from "../../components/background";
import LoginForm from "../../components/loginForm";



export default function LoginPage() {
  return (
    <>
      <Background>
        <main>
          <div className="w-full h-[100vh] flex justify-center items-center">
            <div className="w-[45%] h-[80vh] bg-white grid grid-cols-2 grid-rows-1">
              <div className="cols-span-1 cols-start-1 bg-amber-400">
                <img className="h-full w-auto object-cover object-[60%_center]" src="/images/backgroundLogin.jpg" alt="" />
              </div>
              <div className="cols-span-1 cols-start-2">
                <LoginForm />
              </div>
            </div>
          </div>

        </main>
      </Background>
    </>
  );
}

