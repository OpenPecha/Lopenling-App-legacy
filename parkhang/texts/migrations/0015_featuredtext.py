# Generated by Django 3.2.12 on 2022-06-30 06:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('texts', '0014_auto_20220618_0700'),
    ]

    operations = [
        migrations.CreateModel(
            name='FeaturedText',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField()),
                ('description', models.CharField(blank=True, max_length=500, null=True)),
                ('text', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='texts.text')),
            ],
        ),
    ]
