import React from 'react';
import styled from 'styled-components';
import {useTags} from 'useTags';
import {createId} from 'lib/createId';

const Wrapper = styled.section`
  flex-grow:1;
  background:#FFF;
  padding:0 16px;
  display:flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  >ol{
  margin: 0 -12px;
    >li{
      background: #ff8a8e;
      color: #fff;
      display: inline-block;
      border-radius: 18px;  
      padding:4px 16px;
      font-size:14px;
      margin:6px 12px;
      &.selected{
      background: #fc474d;
      }
    }
  }
  >button{
    border:none;
    border-bottom:1px solid #666;
    background: none;
    font-family: inherit;
    padding:2px 4px;
    color:#666;
    margin-top:16px;
    margin-bottom:16px;
  }
`;
type Props = {
  value:number[],
  onChange:(selected:number[])=>void
}
const TagsSection:React.FC<Props> = (props) => {
  const {tags,setTags} = useTags()
  const selectedTagIds = props.value;
  const onAddTag =()=>{
    const tagName =window.prompt('新标签的名称为');
    if(tagName !== null){
      setTags ([...tags,{id:createId(),name:tagName}])
    }
    if(!tagName){
      setTags ([...tags])
     return  window.alert('标签名不能为空')
    }
    if(tagName.match(/^[ ]*$/) !== null){
      setTags ([...tags])
      return window.alert('请输入有效字符')
    }
  }
  const onToggleTag=(tagId:number)=>{
    const index = selectedTagIds.indexOf(tagId)
    if(index>=0){
      props.onChange(selectedTagIds.filter(t=>t!==tagId))
    }else {
      props.onChange([...selectedTagIds,tagId])
    }
  }
  const getClass =(tagId:number)=>{ return selectedTagIds.indexOf(tagId) >=0 ? 'selected' :''}
  return (
    <Wrapper>
      <ol>
        {tags.map(tag=> <li key={tag.id}
                            onClick={()=>onToggleTag(tag.id)}
                           className={getClass(tag.id)}>
                              {tag.name}
                        </li>)}
      </ol>
      <button onClick={onAddTag}>新增标签</button>
    </Wrapper>);

};
export {TagsSection};