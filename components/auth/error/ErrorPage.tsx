//librires
import Router from "next/router";

function ErrorPage() {
  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center">
      <div>
        <img
          className="h-[140px] w-[140px]"
          src="/images/puzzle-front-color.svg"
        />
      </div>
      <div className="text-base-text-light-1 dark:text-base-text-dark-1 mt-[50px] text-[20px] font-bold">
        مشکلی وجود داره
      </div>
      <div className="text-base-text-light-1 dark:text-base-text-dark-1 text-[20px] font-bold">
        کد دسترسی منقضی شده است
      </div>
      <div className="text-base-text-light-2 dark:text-base-text-dark-2 typography-fn-body-medium px-[48px] text-center">
        در این صفحه برای دریافت اطلاعات به مشکل خوردیم، لطفا بعدا دوباره وارد
        شوید.
      </div>
      <div className="mt-[32px]">
        <button
          className="h-[45px] w-[160px] rounded-[10px] bg-red-600 font-bold text-white"
          onClick={() => {
            localStorage.clear();
            Router.push("/");
            location.reload();
          }}
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
