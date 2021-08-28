import React from 'react';

import './tag-list.styles.css';

export const TagList = props => (
  <div className='tag-list'>
    <span
      title='all'
      className={`${props.visibleClickedTags.includes('all') ? 'tag-list-tag-clicked' : 'tag-list-tag'}`}
      onClick={props.handleClickedTag}>all</span>
    {
      props.tags.map((tag, index) => (
        <span
          title={tag}
          className={`${props.visibleClickedTags.includes(tag) ? 'tag-list-tag-clicked' : 'tag-list-tag'}`}
          key={index}
          onClick={props.handleClickedTag}>{tag}</span>
      ))
    }
  </div>
);
