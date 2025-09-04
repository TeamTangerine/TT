import profileImg from '../assets/Ellipse 6.png';
import postImg from '../assets/post-img-example.png';

function Posting() {
  return (
    <li>
      <img src={profileImg} alt="해당 게시물 작성자 프로필" />
      <article>
        <div>
          <div>
            <h2>애월읍 위니브 감귤농장</h2>
            <p>@weniv_Mandarin</p>
          </div>
          <button>🍔</button>
        </div>
        <p>
          웃을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와
          악동하다. 대고 못할 넣는 풍부하게 뛰는 뛰노는 인생의 힘있다.
        </p>
        <img src={postImg} alt="게시물 이미지" />
        <div>
          <button>♥️</button>
          <span>58</span>
          <button>💬</button>
          <span>12</span>
        </div>
        <time dateTime="2020-10-21">2020년 10월 21일</time>
      </article>
    </li>
  );
}
export default Posting;
