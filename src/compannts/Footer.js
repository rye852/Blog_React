const Footer = () => {
  const date = new Date();
  return <footer className="Footer"> copyright &copy; {date.getFullYear()}</footer>;
};

export default Footer;
