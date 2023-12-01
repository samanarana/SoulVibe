from flask import Blueprint, jsonify, current_app
import os


resource_routes = Blueprint('resources', __name__)

resources = [
    {'id': 1, 'name': 'Tensegrity', 'type': 'internal', 'description': 'Tom Meyers goes into the importance of tensegrity in the human body', 'excerpt': 'Tensegrity is an elision of ‘tension + integrity’. Buckminster Fuller, building on the highly original sculptures of Kenneth Snelson, coined the term, to indicate....', 'content_file': 'blog1.md'},
    {'id': 2, 'name': 'Fascia Lines', 'type': 'internal', 'description': 'The concept of Fascia Lines is a great way to understand how the body functions and how treatment can be optimized to increase mobility and functionality.', 'excerpt': 'The main principle is that muscles, no matter what they do individually, also affect tissues throughout the entire body...', 'content_file': 'blog2.md'},
    {'id': 3, 'name': 'Are Humans Carnivores?', 'type': 'internal', 'description': 'Humans are carnivores based on what we are evolutionarily adapted to.', 'excerpt': 'Studies of the remaining hunter gatherer societies in the 1900s “showed them to be generally free of the signs and symptoms of cardiovascular disease (CVD), and other so-called diseases of human civilization.”....', 'content_file': 'blog3.md'},
    {'id': 4, 'name': 'Biohacking and Brain Hacking For Performance', 'type': 'internal', 'description': 'With biohacking, we use specific techniques to optimize our biology and health, while brain hacking involves techniques designed to enhance brain function and performance.', 'excerpt': 'In a nutshell, biohacking involves using various techniques, including nutritional supplements, exercise, and lifestyle changes...', 'content_file': 'blog4.md'},

    {'id': 5, 'name': 'Long-Term Ketosis is Harmful', 'type': 'external', 'description': 'Ketosis is an inherently stressful state. Your body requires glucose to function. If your blood glucose levels fall too low, you will fall into a coma and die. In fact, your body wants glucose so badly it will convert... ', 'link': 'https://carnivoreaurelius.com/long-term-dangers-of-ketosis/'},
    {'id': 6, 'name': 'Glycine Deficiency', 'type': 'external', 'description': 'Glycine, a non-essential amino acid, plays a pivotal role in synthesizing collagen, the most abundant protein in our bodies. Unfortunately, the paper mentioned above by Meléndez-Hevia showed that our bodies don’t make enough glycine to keep up with our collagen needs...', 'link': 'https://daveasprey.com/glycine-deficiency-its-more-common-than-you-think/'},

]

# Fetch all resources available in the hub
@resource_routes.route('/', methods=['GET'])
def get_resources():
    return jsonify(resources)

# Fetch a specific resource from the hub
@resource_routes.route('/<int:id>', methods=['GET'])
def get_resource(id):
    resource = next((res for res in resources if res['id'] == id), None)
    if resource:
        return jsonify(resource)
    else:
        return ('Resource not found', 404)


# Fetch full content of an internal blog post
@resource_routes.route('/blog/<int:id>', methods=['GET'])
def get_blog_post(id):
    blog_post = next((res for res in resources if res['id'] == id and res['type'] == 'internal'), None)
    if blog_post:
        try:
            # Assuming your blog posts are stored in a 'blog_posts' folder within your project
            blog_file_path = os.path.join(current_app.root_path, 'blog_posts', blog_post['content_file'])
            with open(blog_file_path, 'r') as file:
                content = file.read()
            return jsonify({'name': blog_post['name'], 'content': content})
        except FileNotFoundError:
            return jsonify({'error': 'Blog post not found'}), 404
    else:
        return jsonify({'error': 'Blog post not found'}), 404
