import React, {useState, useCallback} from 'react';
import MapButton from "../../components/map/MapButton";

const TagItem = React.memo(({tag}) => (
    <div>#{tag}</div>
));

const TagList = React.memo(({tags}) => (
        <div>{tags.map(tag => <TagItem key={tag} tag={tag}/>)}</div>
));

const MarkerInfo = ({position}) => {
    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState([]);
    const [markerInfo, setMarkerInfo] = useState({
        name: null,
        description: null,
        tags: [],
        position: {lat: null, lng: null},
    });

    const insertTag = useCallback(
        tag => {
            if (!tag) return;
            if (localTags.includes(tag)) return;
            const nextTags = [...localTags, tag];
            setLocalTags(nextTags);
        }, [localTags],
    );

    const onChange = useCallback(e => {
        setInput(e.target.value);
    }, []);

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            setMarkerInfo({
                name: e.target[0].value,
                description: e.target[1].value,
                position: {lat: position.lat, lng: position.lng},
            });
            console.dir(markerInfo);
        }, [markerInfo]
    );

    const onTagSubmit = useCallback(
        e => {
            e.preventDefault();
            insertTag(input.trim());
            setInput('');
        }, [input, insertTag]
    );

    return (

        <div>
            <form onSubmit={onSubmit} onChange={onChange}>
                <input placeholder="이름 입력"/>
                <input placeholder="설명 입력"/>
                <MapButton type="submit">제출</MapButton>
            </form>
            <h2>위도 : {markerInfo.position.lat} </h2>
            <h2>경도 : {markerInfo.position.lng} </h2>
            <h2>이름 : {markerInfo.name}</h2>
            <h2>설명 : {markerInfo.description}</h2>
            <h4>태그</h4>
            <form onSubmit={onTagSubmit}>
                <input placeholder="태그를 입력해주세요" value={input} onChange={onChange}/>
                <button type="submit">추가</button>
            </form>
            <TagList tags={localTags}/>
        </div>
    );
};

export default MarkerInfo;
