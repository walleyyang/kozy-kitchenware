import React, { Component } from 'react';

import { Header } from './components/header/header.component'
import { ProductList } from './components/product-list/product-list.component';

import './App.css';

class App extends Component {
  constructor() {
    super();

    const productsConfig = require('./config/product-config.json');
    const filteredTags = new Set();

    productsConfig.forEach(product => product.tags.forEach(tag => {
      filteredTags.add(tag);
    }));

    this.state = {
      tags: Array.from(filteredTags).sort(),
      products: productsConfig,
      clickedTags: Array.from(filteredTags),
      visibleClickedTags: ['all']
    }
  }

  handleClickedTag = (e) => {
    const { tags, clickedTags, visibleClickedTags } = this.state;
    const clickedValue = e.target.innerHTML;

    // Initial value should show all products
    if (clickedValue === 'all') {
      const allTags = [...tags];
      this.setState({ clickedTags: allTags });
      this.setState({ visibleClickedTags: ['all'] });
    }
    // Remove all from being visible if it exists when a user clicks a tag
    else if (clickedValue !== 'all' && visibleClickedTags.includes('all')) {
      this.setState({ clickedTags: [clickedValue] });
      this.setState({ visibleClickedTags: [clickedValue] });
    }
    // Add to clickedTags and visibleClickedTags
    else if (!clickedTags.includes(clickedValue)) {
      this.setState({ clickedTags: [...clickedTags, clickedValue] });
      this.setState({ visibleClickedTags: [...clickedTags, clickedValue] });
    }
    // Remove from clickedTags and visibleClickedTags
    else {
      const filteredClickedTags = clickedTags;
      const filteredVisibleClickedTags = visibleClickedTags;

      filteredClickedTags.splice(filteredClickedTags.indexOf(clickedValue), 1);
      filteredVisibleClickedTags.splice(filteredVisibleClickedTags.indexOf(clickedValue), 1);

      this.setState({ clickedTags: filteredClickedTags });
      this.setState({ visibleClickedTags: filteredVisibleClickedTags });
    }

    // Repopulate all if no tags are clicked
    if (clickedTags.length === 0) {
      const allTags = [...tags];
      this.setState({ clickedTags: allTags });
      this.setState({ visibleClickedTags: ['all'] });
    }
  }

  render() {
    const { products, clickedTags } = this.state;
    const filteredProducts = products.filter(product =>
      product.tags.some(item => clickedTags.includes(item))
    );

    return (
      <div className='App'>
        <Header
          visibleClickedTags={this.state.visibleClickedTags}
          tags={this.state.tags} handleClickedTag={this.handleClickedTag} />
        <ProductList
          products={filteredProducts} />
      </div>
    );
  }
}

export default App;
