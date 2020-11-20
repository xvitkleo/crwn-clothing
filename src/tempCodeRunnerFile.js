const mapStateToProps = ({ user }) => ({ // user reducer destructurado, con esto podemos utilizar el currentUser (ya lo puedes utilizar como prop)
  currentUser: user.currentUser
})