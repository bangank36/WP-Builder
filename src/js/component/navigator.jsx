import React, { useEffect, useState } from "react";
import {
    __experimentalNavigatorProvider as NavigatorProvider,
    __experimentalNavigatorScreen as NavigatorScreen,
    __experimentalNavigatorButton as NavigatorButton,
    __experimentalNavigatorToParentButton as NavigatorToParentButton,
  } from '@wordpress/components';
  
  const MyNavigation = (props) => {
    const [screens, setScreens] = useState({
        route: '/',
        children: [{
            route: '/child',
            content: 'this is child'
        },{
            route: '/child2',
            content: 'this is child2'
        }]
    });

    useEffect(() => {
        setTimeout(() => {
            setScreens({
                route: '/',
                children: [{
                    route: '/childs',
                    content: 'this is a child'
                },{
                    route: '/childs2',
                    content: 'this is a child2'
                }]
            });
        }, 2000)
    }, [])
  return (
    <NavigatorProvider initialPath={screens['route']}>
        <NavigatorScreen path="/">
            {screens.children.map((child) => {
                return (
                    <NavigatorButton path={child.route}>
                        Navigate to {child.route} screen.
                    </NavigatorButton>
                )
            })}
        
        <p>This is the home screen.</p>
        {props.children}
        
      </NavigatorScreen>

        {screens.children.map((child) => {
            return (
                <NavigatorScreen path={child.route}>
                <NavigatorToParentButton>
                    Go back
                  </NavigatorToParentButton>
                  <p>This is the {child.content} screen.</p>
                  <NavigatorScreen path="/childs">
      <NavigatorToParentButton>
          Go backs
        </NavigatorToParentButton>
        
      </NavigatorScreen>
                </NavigatorScreen>
            )
        })}
      
  
     

      <NavigatorScreen path="/child/child1">
      <NavigatorButton path="/">
           Navigate to home screen.
        </NavigatorButton>
        <p>This is the child screen.</p>
      </NavigatorScreen>
    </NavigatorProvider>
  )};

export default MyNavigation;