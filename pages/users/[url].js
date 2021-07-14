export default function FilmDetay({ user }) {
  console.log(user);
  return (
    <div>
      <h3>{user.name}</h3>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const request = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.url}`
  );
  const user = await request.json();

  return {
    props: {
      user,
    },
  };
}
