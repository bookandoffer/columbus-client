import { Component } from 'react'

export default class Footer extends Component {

  render () {
    const categories = this.props.categories
    return (
      <div className='layout vertical pa4 center mb0 sysFont' style={{'minHeight': '300px'}}>
        {categories.map(category => {
          <Link href={category.url}>
          <div style={{backgroundImage: `url(${category.image})`}}>
            <div>{category.title}</div>
          </div>
        </Link>
        })}
      </div>
    )
  }
}
