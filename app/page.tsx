export default function Home() {
  return (
    <>
      <div className="mx-auto w-1/3 space-y-4">
        <div className="foreground space-y-2 rounded-md border border-solid border-black p-6">
          <h1 className="mb-3 text-5xl">Course Content</h1>
          <ul>
            <li>Dolore ipsum adipisicing consequat voluptate occaecat Lorem ea pariatur deserunt ipsum.</li>
            <li>Esse ad nulla aliquip velit eu aliquip dolor.</li>
            <li>In pariatur culpa elit ad.</li>
            <li>Proident aliquip aute adipisicing eu commodo laborum id quis aliquip eu esse eiusmod.</li>
            <li>Voluptate non culpa duis fugiat culpa.</li>
            <li>Sint mollit ullamco velit laboris proident est.</li>
            <li>Cillum nostrud ad ipsum cillum nulla sunt laboris fugiat Lorem ut proident.</li>
            <li>Quis aute aliquip ut ea enim in sunt culpa deserunt.</li>
          </ul>
        </div>

        <div className="foreground space-y-2 rounded-md border border-solid border-black p-6">
          <h1 className="mb-3 text-5xl">Class Information</h1>
          <p>
            Officia sint exercitation cupidatat ea mollit. Consequat Lorem aliqua ea eiusmod ad ut consequat elit. Qui laborum Lorem qui nostrud qui esse nulla aliqua excepteur nostrud Lorem consequat pariatur fugiat.
          </p>
        </div>

        <div className="foreground space-y-2 rounded-md border border-solid border-black p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Purpose.jpg" alt="" />
        </div>
      </div>
    </>
  );
}
