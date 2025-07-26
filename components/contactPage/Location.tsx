import MyInfo from "../MyInfo"

export default function Location() {
  return (
    <div className="p-12">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127635.8994207056!2d14.985963!3d10.595084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10f1e1e1e1e1e1e1%3A0x1e1e1e1e1e1e1e1e!2sMaroua%2C%20Cameroun!5e0!3m2!1sfr!2scm!4v1710000000000!5m2!1sfr!2scm"
        style={{ border: 0 } as React.CSSProperties}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-96"
      ></iframe>
      <ul className="grid grid-cols-1 mt-10 location sm:grid-cols-2 gap-y-2">
        <MyInfo field="address" value="Maroua, Cameroun" />
        <MyInfo field="email" value="tchikayafamikenzofranck@gmail.com" />
        <MyInfo field="phone" value="+237 690 456 422" />
        <MyInfo field="freelance" value="Available" />
      </ul>
    </div>
  )
}
