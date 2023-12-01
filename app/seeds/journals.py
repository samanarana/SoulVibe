from app.models import db, Journal, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta
import random

def generate_random_dates(num_dates):
    base_date = datetime.today()
    dates = set()

    while len(dates) < num_dates:
        random_date = base_date - timedelta(days=random.randint(0, 15))
        dates.add(random_date)

    return list(dates)


def seed_journals():
    journal_entries = []
    content_samples = [
        "Today was quite a day at work. I managed to solve a complex problem that had been bugging me for weeks. It feels great to overcome such challenges, and I'm proud of my persistence and creativity in finding a solution.",
        "I had a deep conversation with my best friend about life and our future plans. It's always refreshing to have someone who understands and supports you. We laughed, shared our dreams, and made some exciting plans for the upcoming months.",
        "Feeling a little down today. Things didn't go as planned, and I'm finding it hard to stay positive. I know tomorrow is a new day, but right now, I just need some time to process my feelings and maybe watch a comforting movie.",
        "Had an amazing family dinner tonight. There's something special about sharing a meal with loved ones, discussing various topics, and just enjoying each other's company. It's moments like these that I cherish the most.",
        "Woke up feeling incredibly refreshed this morning. I had a good night's sleep for the first time in a while, and it's amazing how much difference it makes. I'm energized and ready to tackle whatever the day throws at me.",
        "I tried a new recipe today, and it turned out fantastic! Cooking is such a therapeutic activity for me. It's amazing how combining simple ingredients can result in something so delicious and satisfying.",
        "Today was one of those days where everything seemed to go wrong. I'm trying to remind myself that bad days are a part of life and it's okay not to be okay sometimes. I'm hoping for a better day tomorrow.",
        "I'm feeling really proud of myself for sticking to my workout routine. Today's session was particularly intense, and I pushed through it. It's rewarding to see my progress and know that my hard work is paying off.",
        "I spent the afternoon reading at my favorite café. There's something about the ambiance there that makes me feel so relaxed and content. I'm grateful for these small moments of peace amidst a hectic life.",
        "Had a bit of a rough day at work today. Sometimes it feels like no matter how hard I work, it's never enough. I'm trying to stay positive and focus on the things I can control, but it's tough."
    ]

    mood_emojis = ["😀", "😢", "😨", "😌", "😍", "😴", "😎", "🤢", "😞", "😡"]

    for user_id in range(1, 7):
        dates = generate_random_dates(8)
        for date in dates:
            content = random.choice(content_samples)
            mood_emoji = random.choice(mood_emojis)
            journal_entry = Journal(
                userId=user_id,
                date=date,
                content=content,
                mood_emoji=mood_emoji
            )
            journal_entries.append(journal_entry)

    db.session.add_all(journal_entries)
    db.session.commit()

def undo_journals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.journals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM journals"))

    db.session.commit()
