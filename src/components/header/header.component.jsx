import React from 'react';

import { TagList } from '../tag-list/tag-list.component';

import './header.styles.css';

export const Header = props => (
  <div className='header-container'>
    <img alt='Kozy Kitchenware' src={`${process.env.PUBLIC_URL}/logo.png`} />
    <TagList
      visibleClickedTags={props.visibleClickedTags}
      tags={props.tags}
      handleClickedTag={props.handleClickedTag} />
  </div>
);
