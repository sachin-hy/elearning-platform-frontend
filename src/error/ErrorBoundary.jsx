import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
   
    return { hasError: true };
  }

  componentDidCatch(error, info) {
  
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div
              className="flex text-black w-full h-full justify-center items-center flex-col gap-4">
                 <h2>Something went wrong. Please try again later.</h2>
             </div>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
