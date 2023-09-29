"use client";
import { Button } from "@/components/ui/button";

export default function Page() {
  async function upload(thing: FormData) {
    const formData = new FormData();
    formData.append("name", "noel");
    const response = await fetch("/api/s3", {
      method: "POST",
      body: thing,
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <div>
      {/* <Button onClick={upload}>Upload</Button> */}

      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitting form");

          const formData = new FormData(e.currentTarget);
          upload(formData);
        }}
      >
        <input type="file" name="file" />
        {/* <input type="text" name="name" defaultValue="Noel" /> */}
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
}
