import Container from "../../../components/container/Container";
import FormEditUser from "./formEditUser";
import UserProfile from "./userProfile";

export default function EditProfile() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[70px] lg:pl-[20%]">
        <div className="w-[90%] h-max m-auto flex flex-col items-center gap-4">
          <h1 className="text-[1.3rem] text-[#4d44D5] font-semibold tracking-[2px]">
            Edit Profile
          </h1>
          <UserProfile />
          <FormEditUser />
        </div>
      </div>
    </Container>
  );
}
