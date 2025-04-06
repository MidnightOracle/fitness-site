export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'the-power-of-mindful-movement',
    title: 'The Power of Mindful Movement: Connecting Body and Mind',
    excerpt: 'Discover how mindfulness can transform your fitness journey and enhance your overall well-being through intentional movement practices.',
    image: '/images/blog/mindful-movement.jpg',
    category: 'Mindfulness',
    date: 'March 15, 2024',
    readTime: '8 min read',
    content: `
      <p>In today's fast-paced world, many of us approach fitness as just another task to check off our list. But what if we could transform our workouts into a mindful practice that nourishes both body and mind?</p>

      <h2>Understanding Mindful Movement</h2>
      <p>Mindful movement is the practice of bringing full attention to your body's movements, sensations, and breath during physical activity. It's about being present in the moment and cultivating awareness of how your body feels and moves.</p>

      <h2>Benefits of Mindful Movement</h2>
      <p>Research shows that incorporating mindfulness into your fitness routine can lead to:</p>
      <ul>
        <li>Improved body awareness and coordination</li>
        <li>Reduced stress and anxiety</li>
        <li>Better recovery and injury prevention</li>
        <li>Enhanced enjoyment of physical activity</li>
      </ul>

      <h2>Practical Tips for Mindful Movement</h2>
      <p>Here are some ways to incorporate mindfulness into your workouts:</p>
      <ol>
        <li>Start with a brief meditation or breathing exercise</li>
        <li>Pay attention to your breath during movement</li>
        <li>Notice how your body feels during each exercise</li>
        <li>Practice gratitude for your body's capabilities</li>
      </ol>

      <h2>Creating Your Mindful Movement Practice</h2>
      <p>Begin by choosing one workout per week to practice mindful movement. Start with a familiar routine and gradually incorporate mindfulness into more of your workouts. Remember, it's not about perfection but about cultivating awareness and presence.</p>

      <p>As you develop your mindful movement practice, you'll likely notice improvements not just in your physical fitness, but in your overall well-being and relationship with your body.</p>
    `
  },
  {
    slug: 'benefits-of-yoga-for-golfers',
    title: 'The Benefits of Yoga for Golfers',
    excerpt: 'Discover how incorporating yoga into your golf routine can improve your swing, prevent injuries, and lower your scores.',
    image: '/images/yoga-golf.jpg',
    category: 'Golf Fitness',
    date: 'March 15, 2024',
    readTime: '5 min read',
    content: `
      <h2>Introduction to Yoga for Golf</h2>
      <p>Golf requires a unique combination of strength, flexibility, and mental focus. Yoga can help improve all these aspects of your game.</p>

      <h2>Benefits for Your Golf Swing</h2>
      <p>A regular yoga practice can increase your range of motion and help you achieve a more powerful and controlled swing.</p>

      <h2>Injury Prevention</h2>
      <p>Learn how specific yoga poses can help prevent common golf injuries and keep you on the course longer.</p>

      <h2>Mental Focus and Breathing</h2>
      <p>Discover breathing techniques and mindfulness practices that can help improve your concentration during crucial shots.</p>
    `
  },
  {
    slug: 'aqua-fitness-joint-health',
    title: 'Why Aqua Fitness is Great for Joint Health',
    excerpt: 'Learn how water-based exercises can help improve joint mobility, reduce pain, and build strength without impact.',
    image: '/images/aqua-fitness.jpg',
    category: 'Aqua Fitness',
    date: 'March 12, 2024',
    readTime: '4 min read',
    content: `
      <h2>The Power of Water Resistance</h2>
      <p>Water provides natural resistance in all directions, making it an ideal environment for building strength while protecting your joints.</p>

      <h2>Benefits for Joint Health</h2>
      <p>The buoyancy of water reduces the impact on your joints while allowing for a full range of motion and effective muscle engagement.</p>

      <h2>Exercises for Every Level</h2>
      <p>From gentle water walking to high-intensity aqua aerobics, there's an aqua fitness option for everyone.</p>

      <h2>Recovery and Rehabilitation</h2>
      <p>Discover how aqua fitness can aid in recovery from injury and help manage chronic joint conditions.</p>
    `
  },
  {
    slug: 'dance-fit-cardio-benefits',
    title: 'Dance Your Way to Better Cardio Health',
    excerpt: 'Explore the cardiovascular benefits of dance fitness and how it can make your workout routine more enjoyable.',
    image: '/images/dance-fit.jpg',
    category: 'Dance Fit',
    date: 'March 10, 2024',
    readTime: '6 min read',
    content: `
      <h2>Why Dance Fitness Works</h2>
      <p>Dance fitness combines rhythm, movement, and aerobic exercise to create an engaging and effective workout experience.</p>

      <h2>Cardiovascular Benefits</h2>
      <p>Regular dance fitness sessions can improve heart health, endurance, and overall cardiovascular function.</p>

      <h2>Mental Health Advantages</h2>
      <p>The combination of music, movement, and social interaction can boost mood and reduce stress levels.</p>

      <h2>Getting Started with Dance Fit</h2>
      <p>Learn about different dance fitness styles and how to choose the right class for your fitness level.</p>
    `
  },
  {
    slug: 'senior-fitness-guide',
    title: 'Complete Guide to Senior Fitness',
    excerpt: 'A comprehensive guide to staying active and healthy as you age, with safe and effective exercise recommendations.',
    image: '/images/senior-fitness.jpg',
    category: 'Senior Fitness',
    date: 'March 8, 2024',
    readTime: '7 min read',
    content: `
      <h2>Understanding Senior Fitness</h2>
      <p>Learn about the unique fitness needs and considerations for maintaining an active lifestyle as you age.</p>

      <h2>Safe Exercise Techniques</h2>
      <p>Discover exercises that can help improve strength, balance, and flexibility while minimizing risk of injury.</p>

      <h2>Building a Routine</h2>
      <p>Tips for creating a sustainable exercise routine that fits your lifestyle and abilities.</p>

      <h2>Social Benefits</h2>
      <p>Explore how group fitness classes can provide both physical activity and valuable social interaction.</p>
    `
  },
  {
    slug: 'stretching-mobility-tips',
    title: 'Essential Stretching and Mobility Tips',
    excerpt: 'Learn key stretching techniques and mobility exercises to improve flexibility and prevent injuries.',
    image: '/images/stretching.jpg',
    category: 'Therapeutic Stretch',
    date: 'March 5, 2024',
    readTime: '5 min read',
    content: `
      <h2>The Importance of Mobility</h2>
      <p>Understanding why mobility training is crucial for both athletic performance and daily life activities.</p>

      <h2>Dynamic vs. Static Stretching</h2>
      <p>Learn when and how to use different types of stretching for optimal results.</p>

      <h2>Key Mobility Exercises</h2>
      <p>Essential mobility drills for improving range of motion in major joints and muscle groups.</p>

      <h2>Creating a Routine</h2>
      <p>How to incorporate mobility work into your daily routine for lasting results.</p>
    `
  },
  {
    slug: 'nutrition-workout-recovery',
    title: 'Nutrition Tips for Better Workout Recovery',
    excerpt: 'Discover the best foods and nutrition strategies to optimize your post-workout recovery and results.',
    image: '/images/nutrition.jpg',
    category: 'Nutrition',
    date: 'March 1, 2024',
    readTime: '6 min read',
    content: `
      <h2>Post-Workout Nutrition Basics</h2>
      <p>Learn about the key nutrients your body needs for optimal recovery after exercise.</p>

      <h2>Timing Your Meals</h2>
      <p>Understanding when to eat for maximum recovery benefits and muscle repair.</p>

      <h2>Recovery-Boosting Foods</h2>
      <p>Discover the best foods and supplements to support your body's recovery process.</p>

      <h2>Hydration Strategies</h2>
      <p>Tips for maintaining proper hydration before, during, and after your workouts.</p>
    `
  }
]; 