/* MATH LAB — motivational quotes, shown reactively (map, run results, ceremonies).
   Each: t = quote, a = author, ar = Arabic translation. */
window.QUOTES = {

  /* deep + strong — daily rotation on the system map */
  daily: [
    { t: 'It always seems impossible until it is done.', a: 'Nelson Mandela',
      ar: 'يبدو الأمر مستحيلاً دائماً حتى يتم إنجازه.' },
    { t: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', a: 'Will Durant',
      ar: 'نحن ما نفعله باستمرار. فالتميّز إذن ليس فعلاً واحداً، بل عادة.' },
    { t: 'The impediment to action advances action. What stands in the way becomes the way.', a: 'Marcus Aurelius',
      ar: 'ما يعيق الطريق يصبح هو الطريق.' },
    { t: 'He who has a why to live can bear almost any how.', a: 'Friedrich Nietzsche',
      ar: 'من يملك سبباً للعيش يستطيع تحمّل أي طريقة تقريباً.' },
    { t: 'A river cuts through rock, not because of its power, but because of its persistence.', a: 'James N. Watkins',
      ar: 'النهر يشقّ الصخر لا بقوته، بل بإصراره.' },
    { t: 'Do not pray for an easy life; pray for the strength to endure a difficult one.', a: 'Bruce Lee',
      ar: 'لا تتمنَّ حياة سهلة، بل اطلب القوة لتتحمّل حياة صعبة.' },
    { t: 'Discipline is the bridge between goals and accomplishment.', a: 'Jim Rohn',
      ar: 'الانضباط هو الجسر بين الأهداف والإنجاز.' },
    { t: 'Knowledge is power.', a: 'Francis Bacon',
      ar: 'المعرفة قوة.' },
    { t: 'The best time to plant a tree was twenty years ago. The second best time is now.', a: 'Chinese proverb',
      ar: 'أفضل وقت لزرع شجرة كان قبل عشرين سنة، وثاني أفضل وقت هو الآن.' },
    { t: 'How you do anything is how you do everything.', a: 'Zen saying',
      ar: 'الطريقة التي تفعل بها أي شيء هي الطريقة التي تفعل بها كل شيء.' },
    { t: 'Seek knowledge from the cradle to the grave.', a: 'Arabic wisdom',
      ar: 'اطلب العلم من المهد إلى اللحد.' },
    { t: 'The man who moves a mountain begins by carrying away small stones.', a: 'Confucius',
      ar: 'من يحرّك جبلاً يبدأ بحمل الحجارة الصغيرة.' }
  ],

  /* after a passed run — keep the fire */
  win: [
    { t: 'Success is the sum of small efforts, repeated day in and day out.', a: 'Robert Collier',
      ar: 'النجاح هو مجموع جهود صغيرة تتكرر يوماً بعد يوم.' },
    { t: 'Well done is better than well said.', a: 'Benjamin Franklin',
      ar: 'الفعل الحسن خير من القول الحسن.' },
    { t: 'The expert in anything was once a beginner.', a: 'Helen Hayes',
      ar: 'الخبير في أي شيء كان يوماً مبتدئاً.' },
    { t: 'The more I practice, the luckier I get.', a: 'Gary Player',
      ar: 'كلما تدرّبت أكثر، صار حظي أوفر.' },
    { t: 'Small daily improvements are the key to staggering long-term results.', a: 'Robin Sharma',
      ar: 'التحسينات الصغيرة اليومية هي مفتاح نتائج مذهلة على المدى الطويل.' },
    { t: 'What we learn with pleasure we never forget.', a: 'Alfred Mercier',
      ar: 'ما نتعلمه بمتعة لا ننساه أبداً.' }
  ],

  /* after a failed run — resilience, no shame */
  lose: [
    { t: 'I have not failed. I have just found 10,000 ways that will not work.', a: 'Thomas Edison',
      ar: 'أنا لم أفشل، بل وجدت عشرة آلاف طريقة لا تنجح.' },
    { t: 'Fall seven times, stand up eight.', a: 'Japanese proverb',
      ar: 'اسقط سبع مرات، وانهض ثماني مرات.' },
    { t: 'It does not matter how slowly you go, as long as you do not stop.', a: 'Confucius',
      ar: 'لا يهم كم تسير ببطء، ما دمت لا تتوقف.' },
    { t: 'Our greatest glory is not in never falling, but in rising every time we fall.', a: 'Confucius',
      ar: 'أعظم مجدنا ليس في ألا نسقط أبداً، بل في أن ننهض كل مرة نسقط فيها.' },
    { t: 'Smooth seas do not make skillful sailors.', a: 'African proverb',
      ar: 'البحار الهادئة لا تصنع بحّارة مهرة.' },
    { t: 'The only real mistake is the one from which we learn nothing.', a: 'Henry Ford',
      ar: 'الخطأ الحقيقي الوحيد هو الخطأ الذي لا نتعلم منه شيئاً.' },
    { t: 'A person who never made a mistake never tried anything new.', a: 'Albert Einstein',
      ar: 'من لم يخطئ قط، لم يجرّب شيئاً جديداً قط.' },
    { t: 'Difficulties strengthen the mind, as labor does the body.', a: 'Seneca',
      ar: 'الصعوبات تقوّي العقل كما يقوّي العملُ الجسد.' }
  ],

  /* boss victories & ceremonies — triumph */
  boss: [
    { t: 'Victory belongs to the most persevering.', a: 'Napoleon Bonaparte',
      ar: 'النصر حليف الأكثر مثابرة.' },
    { t: 'What we achieve inwardly will change outer reality.', a: 'Plutarch',
      ar: 'ما نحققه في داخلنا سيغيّر واقعنا الخارجي.' },
    { t: 'The harder the battle, the sweeter the victory.', a: 'Les Brown',
      ar: 'كلما اشتدت المعركة، كان النصر أحلى.' },
    { t: 'Great things are done by a series of small things brought together.', a: 'Vincent van Gogh',
      ar: 'الأشياء العظيمة تُصنع من سلسلة أشياء صغيرة اجتمعت معاً.' }
  ]
};
