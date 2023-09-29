export default function Page({ params }: { params: { id: string } }) {
  return <div>Product Page: {params.id}</div>;
}
