import './ProfilePixelPortrait.css'

export default function ProfilePixelPortrait({
  src = '/assets/profile/jian-zhuofan-pixel-portrait.png',
  alt = '简卓凡的像素化人物肖像',
  index = '01',
}) {
  return <figure className="profile-pixel-portrait" aria-label={alt}>
    <div className="profile-pixel-portrait__frame">
      <img src={src} alt={alt} />
      <i /><i /><i />
    </div>
    <figcaption>{index} / PIXEL SELF-PORTRAIT<br />OBSERVE · REFRAME · TELL</figcaption>
  </figure>
}
