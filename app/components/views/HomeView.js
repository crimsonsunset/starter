import React, {Component} from 'react'
import PropTypes from 'prop-types';
// import routes from '../config/routes'
import mainLogo from'../../assets/svg/search.svg';

class HomeView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    console.log(this);
  }

  render() {
    return (<section>
        {/*<h1>Homeview</h1>*/}

        <nav className="panel">
          <p className="panel-heading">
            wow this is fast
          </p>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input className="input is-medium" type="text" placeholder="search"/>
              {/*<span className="icon is-small is-left">*/}
        {/*<i className="fas fa-search" aria-hidden="true"></i>*/}
      {/*</span>*/}

              <span class="icon is-small is-left">
  <object data={mainLogo} type="image/svg+xml">
  <img src="yourfallback.jpg"/>
</object>
</span>

            </p>
          </div>
          {/*<p className="panel-tabs">*/}
          {/*<a className="is-active">all</a>*/}
          {/*<a>public</a>*/}
          {/*<a>private</a>*/}
          {/*<a>sources</a>*/}
          {/*<a>forks</a>*/}
          {/*</p>*/}
          {/*<a className="panel-block is-active">*/}
          {/*<span className="panel-icon">*/}
          {/*<i className="fas fa-book" aria-hidden="true"></i>*/}
          {/*</span>*/}
          {/*bulma*/}
          {/*</a>*/}
          {/*<a className="panel-block">*/}
          {/*<span className="panel-icon">*/}
          {/*<i className="fas fa-book" aria-hidden="true"></i>*/}
          {/*</span>*/}
          {/*marksheet*/}
          {/*</a>*/}
          {/*<a className="panel-block">*/}
          {/*<span className="panel-icon">*/}
          {/*<i className="fas fa-book" aria-hidden="true"></i>*/}
          {/*</span>*/}
          {/*minireset.css*/}
          {/*</a>*/}
          {/*<a className="panel-block">*/}
          {/*<span className="panel-icon">*/}
          {/*<i className="fas fa-book" aria-hidden="true"></i>*/}
          {/*</span>*/}
          {/*jgthms.github.io*/}
          {/*</a>*/}
          {/*<a className="panel-block">*/}
          {/*<span className="panel-icon">*/}
          {/*<i className="fas fa-code-fork" aria-hidden="true"></i>*/}
          {/*</span>*/}
          {/*daniellowtw/infboard*/}
          {/*</a>*/}
          {/*<a className="panel-block">*/}
          {/*<span className="panel-icon">*/}
          {/*<i className="fas fa-code-fork" aria-hidden="true"></i>*/}
          {/*</span>*/}
          {/*mojs*/}
          {/*</a>*/}
          {/*<label className="panel-block">*/}
          {/*<input type="checkbox"/>*/}
          {/*remember me*/}
          {/*</label>*/}
          {/*<div className="panel-block">*/}
          {/*<button className="button is-link is-outlined is-fullwidth">*/}
          {/*reset all filters*/}
          {/*</button>*/}
          {/*</div>*/}


        </nav>


      </section>
    )


  }
}

export default HomeView