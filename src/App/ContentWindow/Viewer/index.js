import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import { connect } from 'react-redux'

class Viewer extends React.Component {
    render() {
        var data = this.props.activeDoc ? marked(this.props.docData[this.props.activeDoc]) : null
        if (data) {
            // marked wraps <code> blocks in <pre>, which forces them to overflow instead of wrap
            data = data.replace(/<pre><code>([\s\S]*)<\/code><\/pre>/, '<code>$1</code>')
        }
        return (
            <div 
                dangerouslySetInnerHTML={{__html: data}} 
            />
        )
    }
}

Viewer.propTypes = {
}

Viewer.defaultProps = {
}

function mapStateToProps(state, ownProps) {
    return {
        docData: state.docData,
        activeDoc: state.activeDoc,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)