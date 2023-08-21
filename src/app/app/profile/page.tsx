
const ProfilePage = () => {
  return (
    <>
      <form className="mt-10">
        <label className="m">
          Set Bio:
          <input className="ml-10 w-96 h-10 rounded-md" type="text" name="bio" />
        </label>
        <br /> <br />
        <label>
          Address:
          <input className="ml-10 w-96 h-10 rounded-md" type="text" name="address" />
        </label>
        <br />
        <br />
        <button className="w-32 h-12 bg-accent2 text-white rounded-md">Update profile</button>
      </form>
    </>
  )
};
export default ProfilePage;
