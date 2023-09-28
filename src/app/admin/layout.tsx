export default function Layout(props: {
  children: React.ReactNode;
  productModal: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.productModal}
    </>
  );
}
