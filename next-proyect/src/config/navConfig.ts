export interface NavItem {
    text: string,
    path: string,
    isPrivate?: boolean,
}

export const navConfig: NavItem[] = [
    {text: "Home", path: "/Home", isPrivate: false},
    {text: "Dashboard" , path: "/dashboard", isPrivate: true},
    {text: "Cart" , path: "/cart", isPrivate: false},
    {text: "Favorites", path: "/favorites", isPrivate: true},
    {text: "About" , path: "/about", isPrivate: false},
    {text: "Profile" , path: "/profile", isPrivate: true},
]