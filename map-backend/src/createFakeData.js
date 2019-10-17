import Post from './models/post';

export default function createFakeData() {
    const posts = [ ...Array(40).keys()].map(i => ({
        title: `포스트 #${i}`,
        body : '발매 2주 전인 10월 8일에 런치 게임플레이 트레일러가 공개되었으며 다음 날인 9일에 스페셜 옵스 트레일러가 공개되었다. 스페셜 옵스는 4인 코옵 PvE로 이루어지며 캠페인의 연장선상으로 알-카탈라를 상대로 연합군과 동맹군이 힘을 합쳐 미션을 수행하게 된다.',
        tags: ['가짜', '데이터'],
    }));
    Post.insertMany(posts, (err, docs) => {
        console.log(docs);
    });
}