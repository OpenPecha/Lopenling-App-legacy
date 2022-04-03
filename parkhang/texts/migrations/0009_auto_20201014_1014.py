# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-10-14 10:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('texts', '0008_question'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='question',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='question',
            name='title',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='annotation',
            name='type',
            field=models.CharField(choices=[('V', 'Variant'), ('N', 'Note'), ('P', 'Page Break'), ('L', 'Line Break'), ('Q', 'Question')], default='V', max_length=1),
        ),
    ]