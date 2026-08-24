/* MATH LAB — quotes, curated for depth only. No posters, no clichés.
   Each: t = quote, a = author, ar = Arabic translation. */
window.QUOTES = {

  /* daily rotation on the map — the deep ones */
  daily: [
    { t: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', a: 'Will Durant',
      ar: 'نحن ما نفعله باستمرار. فالتميّز إذن ليس فعلاً واحداً، بل عادة.' },
    { t: 'The impediment to action advances action. What stands in the way becomes the way.', a: 'Marcus Aurelius',
      ar: 'ما يعيق الطريق يصبح هو الطريق.' },
    { t: 'The soul becomes dyed with the color of its thoughts.', a: 'Marcus Aurelius',
      ar: 'تصطبغ الروح بلون أفكارها.' },
    { t: 'He who has a why to live can bear almost any how.', a: 'Friedrich Nietzsche',
      ar: 'من يملك سبباً للعيش يستطيع تحمّل أي طريقة تقريباً.' },
    { t: 'The first principle is that you must not fool yourself — and you are the easiest person to fool.', a: 'Richard Feynman',
      ar: 'المبدأ الأول هو ألا تخدع نفسك — وأنت أسهل شخص يمكن خداعه.' },
    { t: 'What I cannot create, I do not understand.', a: 'Richard Feynman',
      ar: 'ما لا أستطيع بناءه، لا أفهمه.' },
    { t: 'The unexamined life is not worth living.', a: 'Socrates',
      ar: 'الحياة التي لا تُفحص لا تستحق أن تُعاش.' },
    { t: 'It is not that we have a short time to live, but that we waste much of it.', a: 'Seneca',
      ar: 'ليست الحياة قصيرة، لكننا نهدر الكثير منها.' },
    { t: 'No man ever steps in the same river twice.', a: 'Heraclitus',
      ar: 'لا يخطو المرء في النهر نفسه مرتين.' },
    { t: 'The mind is not a vessel to be filled, but a fire to be kindled.', a: 'Plutarch',
      ar: 'العقل ليس وعاءً يُملأ، بل نار تُشعل.' },
    { t: 'Do not pray for an easy life; pray for the strength to endure a difficult one.', a: 'Bruce Lee',
      ar: 'لا تتمنَّ حياة سهلة، بل اطلب القوة لتتحمّل حياة صعبة.' },
    { t: 'How you do anything is how you do everything.', a: 'Zen saying',
      ar: 'الطريقة التي تفعل بها أي شيء هي الطريقة التي تفعل بها كل شيء.' },
    { t: 'Pure mathematics is, in its way, the poetry of logical ideas.', a: 'Albert Einstein',
      ar: 'الرياضيات الخالصة هي، بطريقتها، شعر الأفكار المنطقية.' },
    { t: 'The most incomprehensible thing about the world is that it is comprehensible.', a: 'Albert Einstein',
      ar: 'أكثر ما لا يُفهم في هذا العالم هو أنه قابل للفهم.' },
    { t: 'Mathematics is the music of reason.', a: 'James Joseph Sylvester',
      ar: 'الرياضيات هي موسيقى العقل.' },
    { t: 'Mathematics, rightly viewed, possesses not only truth, but supreme beauty.', a: 'Bertrand Russell',
      ar: 'الرياضيات، إذا نُظر إليها كما ينبغي، لا تملك الحقيقة فحسب، بل الجمال الأسمى.' },
    { t: 'The great book of nature is written in the language of mathematics.', a: 'Galileo Galilei',
      ar: 'كتاب الطبيعة العظيم مكتوب بلغة الرياضيات.' },
    { t: 'Whoever has not tasted the bitterness of learning for an hour will swallow the humiliation of ignorance for a lifetime.', a: 'Imam Al-Shafi‘i',
      ar: 'من لم يذق مرّ التعلم ساعة، تجرّع ذل الجهل طول حياته.' },
    { t: 'Resolutions come in the measure of the resolute; noble deeds in the measure of the noble.', a: 'Al-Mutanabbi',
      ar: 'على قدر أهل العزم تأتي العزائم، وتأتي على قدر الكرام المكارم.' }
  ],

  /* after a passed run */
  win: [
    { t: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', a: 'Winston Churchill',
      ar: 'النجاح ليس نهائياً والفشل ليس قاتلاً: الشجاعة على الاستمرار هي ما يهم.' },
    { t: 'The reward of a thing well done is to have done it.', a: 'Ralph Waldo Emerson',
      ar: 'جائزة العمل المتقن هي أنك أنجزته.' },
    { t: 'Excellence withers without an adversary.', a: 'Seneca',
      ar: 'يذبل التميّز من غير خصم.' },
    { t: 'Winning is a habit. Unfortunately, so is losing.', a: 'Vince Lombardi',
      ar: 'الفوز عادة — وللأسف، الخسارة كذلك.' },
    { t: 'Practice isn’t the thing you do once you’re good. It’s the thing you do that makes you good.', a: 'Malcolm Gladwell',
      ar: 'التمرين ليس ما تفعله بعد أن تصبح جيداً، بل هو ما يجعلك جيداً.' },
    { t: 'The more I practice, the luckier I get.', a: 'Gary Player',
      ar: 'كلما تدرّبت أكثر، صار حظي أوفر.' }
  ],

  /* after a failed run — depth, not comfort */
  lose: [
    { t: 'Ever tried. Ever failed. No matter. Try again. Fail again. Fail better.', a: 'Samuel Beckett',
      ar: 'حاولتَ. فشلتَ. لا يهم. حاول ثانية. افشل ثانية. افشل بشكل أفضل.' },
    { t: 'An expert is a person who has made all the mistakes that can be made in a very narrow field.', a: 'Niels Bohr',
      ar: 'الخبير هو من ارتكب كل الأخطاء الممكنة في مجال ضيق جداً.' },
    { t: 'It’s not that I’m so smart, it’s just that I stay with problems longer.', a: 'Albert Einstein',
      ar: 'لست شديد الذكاء، لكنني أبقى مع المسائل وقتاً أطول.' },
    { t: 'We suffer more often in imagination than in reality.', a: 'Seneca',
      ar: 'نتألم في الخيال أكثر مما نتألم في الواقع.' },
    { t: 'Difficulties strengthen the mind, as labor does the body.', a: 'Seneca',
      ar: 'الصعوبات تقوّي العقل كما يقوّي العملُ الجسد.' },
    { t: 'I have not failed. I have just found 10,000 ways that will not work.', a: 'Thomas Edison',
      ar: 'أنا لم أفشل، بل وجدت عشرة آلاف طريقة لا تنجح.' },
    { t: 'Success consists of going from failure to failure without loss of enthusiasm.', a: 'Winston Churchill',
      ar: 'النجاح هو الانتقال من فشل إلى فشل دون أن تفقد الحماس.' },
    { t: 'The master has failed more times than the beginner has even tried.', a: 'Stephen McCranie',
      ar: 'المعلّم فشل مرات أكثر مما حاول المبتدئ أصلاً.' },
    { t: 'Do not judge me by my successes, judge me by how many times I fell down and got back up again.', a: 'Nelson Mandela',
      ar: 'لا تحكموا عليّ بنجاحاتي، بل بعدد المرات التي سقطت فيها ونهضت من جديد.' },
    { t: 'When you are going through hell, keep going.', a: 'Winston Churchill',
      ar: 'إن كنت تمرّ بجحيم، فواصل السير.' },
    { t: 'Failure is simply the opportunity to begin again, this time more intelligently.', a: 'Henry Ford',
      ar: 'الفشل ليس إلا فرصة للبدء من جديد — بذكاء أكبر هذه المرة.' }
  ],

  /* boss victories & ceremonies */
  boss: [
    { t: 'It is not the mountain we conquer, but ourselves.', a: 'Edmund Hillary',
      ar: 'لسنا نقهر الجبل، بل أنفسنا.' },
    { t: 'After climbing a great hill, one only finds that there are many more hills to climb.', a: 'Nelson Mandela',
      ar: 'بعد تسلّق تلّة عظيمة، يكتشف المرء أن هناك تلالاً كثيرة أخرى تنتظر.' },
    { t: 'Every battle is won before it is fought.', a: 'Sun Tzu',
      ar: 'كل معركة تُكسب قبل أن تُخاض.' },
    { t: 'Victory loves preparation.', a: 'Latin maxim — amat victoria curam',
      ar: 'النصر يحب الاستعداد.' },
    { t: 'What we achieve inwardly will change outer reality.', a: 'Plutarch',
      ar: 'ما نحققه في داخلنا سيغيّر واقعنا الخارجي.' },
    { t: 'Great things are done by a series of small things brought together.', a: 'Vincent van Gogh',
      ar: 'الأشياء العظيمة تُصنع من سلسلة أشياء صغيرة اجتمعت معاً.' },
    { t: 'Victory belongs to the most persevering.', a: 'Napoleon Bonaparte',
      ar: 'النصر حليف الأكثر مثابرة.' }
  ]
};
