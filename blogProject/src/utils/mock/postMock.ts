export interface Post {
    id: number;
    date: string;
    title: string;
    author: string;
    content: string;
    imageUrl: string;
}

export const postsMock: Post[] = [
    {
        id: 1,
        date: "on September 19, 2032",
        title: "Classic New York-Style Cheesecake Recipe",
        author: "Jane Doe",
        content: `This classic New York-style cheesecake is rich, creamy, and irresistibly delicious. The velvety smooth filling combines cream cheese, sugar, and eggs, all poured onto a buttery graham cracker crust. Finished with a sour cream topping, it provides the perfect balance of sweetness and tang. Whether served plain or topped with fresh berries, it’s sure to be a hit at any gathering.`,
        imageUrl:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop",
    },

    {
        id: 2,
        date: "on October 01, 2032",
        title: "5 Tips for a Fluffy Soufflé",
        author: "John Smith",
        content: `Achieving the perfect soufflé can be intimidating, but these five tips will help you impress every time. First, ensure your eggs are at room temperature for optimal volume. Second, gently fold in the beaten egg whites to preserve airiness. Third, preheat the oven and avoid opening the door during baking. Fourth, coat your ramekins with butter and sugar to help the soufflé climb. Finally, serve immediately to enjoy its signature puffiness.`,
        imageUrl:
            "https://images.unsplash.com/photo-1602526211924-6bdbb7ea4c75?q=80&w=2080&auto=format&fit=crop",
    },

    {
        id: 3,
        date: "on November 10, 2032",
        title: "The Art of Sourdough Bread",
        author: "Emily Clark",
        content: `Sourdough bread is a labor of love that rewards patience with unparalleled flavor and texture. The process begins with a bubbly starter fed and maintained over days or weeks. Autolyse and long fermentation help develop gluten structure, resulting in an open crumb and crisp crust. Baking on a hot stone or in a Dutch oven locks in steam, giving that iconic ear and crackle. With practice, you can tailor hydration and fermentation times to suit your taste.`,
        imageUrl:
            "https://images.unsplash.com/photo-1525512410787-14c60701a65a?q=80&w=2080&auto=format&fit=crop",
    },

    {
        id: 4,
        date: "on December 05, 2032",
        title: "5 Secrets to Perfect Risotto",
        author: "Michael Brown",
        content: `Risotto is creamy comfort food that shines when technique is mastered. Choose a high-starch rice like Arborio or Carnaroli for that signature richness. Toast the rice briefly in butter or oil, then ladle in warm stock in stages, stirring gently to release starch. Add ingredients like mushrooms, saffron, or parmesan at the right moment to build depth of flavor. Finish with cold butter and cheese off heat for a glossy, velvety finish.`,
        imageUrl:
            "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f1da?q=80&w=2080&auto=format&fit=crop",
    },

    {
        id: 5,
        date: "on January 20, 2033",
        title: "Homemade Chocolate Truffles",
        author: "Samantha Lee",
        content: `Chocolate truffles are deceptively simple to make and make for a luxurious homemade gift. Gently heat heavy cream and pour it over chopped dark chocolate, letting it sit before stirring until smooth. After chilling, scoop and roll into balls, then coat with cocoa powder, chopped nuts, or melted chocolate. Experiment with flavor infusions like espresso, orange zest, or chili for a personal twist. Store in an airtight container and enjoy at room temperature.`,
        imageUrl:
            "https://images.unsplash.com/photo-1600180758895-dafcbf1f3335?q=80&w=2080&auto=format&fit=crop",
    },
];
