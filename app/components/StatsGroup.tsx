import { Text } from '@mantine/core';
import classes from '../modules/StatsGroup.module.css';

import { myCreateServerClient } from '../api/customHooks';
import { getCurrentUserByEmail } from '../api/api';

export async function StatsGroup() {
  async function getCurrentUser(){
    const supabase = await myCreateServerClient();
    const { data } = await supabase.auth.getSession()
    const userEmail = data.session.user.email;
    const user = await getCurrentUserByEmail(userEmail)
    return user[0];
  }

  function getTotalRevenue(transactions){
    let total = 0;
    if(transactions){
      transactions.forEach(transaction => {
        total += Number(transaction.total_amount);
      })
    }

    return total.toFixed(2);
  }

  function getNumVansRented(transactions){
    return transactions ? transactions.length : 0;
  }

  function getNumFiveStarReviews(reviews){
    let numFiveStarReviews = 0;
    if(reviews){
      reviews.forEach(review => {
        if(review.rating === 5){
          numFiveStarReviews++;
        }
      })
    }

    return numFiveStarReviews;
  }

  const user = await getCurrentUser();
  const totalRevenue = getTotalRevenue(user.transactions);
  const numVansRented = getNumVansRented(user.transactions);
  const numFiveStarReviews = getNumFiveStarReviews(user.all_reviews)

  const data = [
    {
      stats: `$${totalRevenue}`,
      title: "Total Revenue",
      description: `You've made $${totalRevenue} since you've begun renting your vans.`
    },
    {
      stats: numVansRented,
      title: "Van Rentals",
      description: "This is how many times your vans have been rented. Keep it rollin'!"
    },
    {
      stats: numFiveStarReviews,
      title: "Number of 5 star reviews",
      description: "More 5 star reviews means more customers. Well done."
    }
  ]


  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}
