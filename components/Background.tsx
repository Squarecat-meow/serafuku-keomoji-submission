import Image from 'next/image';
import Bg from '../public/BG.jpg';

export default function Background() {
  return (
    <Image
      src={Bg}
      alt="페이지 배경"
      className="w-screen h-screen opacity-15 object-cover absolute top-0 left-0 -z-[1]"
    />
  );
}
