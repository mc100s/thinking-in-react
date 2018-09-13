import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';


const ProductCategoryRow = (props) => (
  <tr>
    <th colSpan="2">
      {props.category}
    </th>
  </tr>
);

const ProductRow = (props) => {
  const product = props.product;
  const name = product.stocked ?
    product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

const ProductTable = (props) => {
  const rows = [];
  let lastCategory = null;

  props.products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

const SearchBar = (props) => (
  <form>
    <input
      type="text"
      placeholder="Search..."
      value={props.filterText}
      onChange={e => props.onFilterTextChange(e)} />
    <p>
      <input type="checkbox" checked={props.inStockOnly} onChange={props.onInStockOnlyChange} />
      {' '}
      Only show products in stock
    </p>
  </form>
);
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: 'ball',
      inStockOnly: false
    }
  }
  handleFilterTextChange(e) {
    this.setState({
      filterText: e.target.value
    })
  }
  handleInStockOnlyChange(e) {
    this.setState({
      inStockOnly: e.target.checked
    })
  }
  render() {
    let filteredProducts = this.props.products.filter(p =>
      p.name.toUpperCase().includes(this.state.filterText.toUpperCase())
      && (!this.state.inStockOnly || p.stocked
      )
    )
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange.bind(this)}
          onInStockOnlyChange={this.handleInStockOnlyChange.bind(this)} />
        <ProductTable products={filteredProducts} />
      </div>
    );
  }
}


const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

ReactDOM.render(
  <App products={PRODUCTS} />,
  document.getElementById('root')
);
