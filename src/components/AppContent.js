import React ,{Component} from 'react';
import Restaurant from './Restaurant';

class AppContent extends Component{
    render(){
        return(
            <div>
                <div className="app-content-header">
                    <h1>{this.props.title}</h1>
                </div>
                <div className="app-content">
                    {this.props.trending.map((rest,index) => <Restaurant rest={rest} key={index}/>)}
                </div>
            </div>
        )
    }
}
export default AppContent;