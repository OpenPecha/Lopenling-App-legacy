# Generated by Django 3.2.12 on 2022-06-19 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alignments', '0002_auto_20220618_0713'),
    ]

    operations = [
        migrations.AddField(
            model_name='imagealignment',
            name='type',
            field=models.CharField(blank=True, max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='textalignment',
            name='type',
            field=models.CharField(blank=True, max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='videoalignment',
            name='type',
            field=models.CharField(blank=True, max_length=1, null=True),
        ),
    ]
