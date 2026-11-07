// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.cloud.pubsub.v1;

// [START pubsub_v1_publisher_topics_list]
import com.google.cloud.pubsub.v1.TopicAdminClient;
import com.google.pubsub.v1.ProjectName;
import com.google.pubsub.v1.Topic;
import java.io.IOException;

public class ListTopics {

  public static void main(String[] args) throws IOException {
    if (args.length >= 2) {
      listTopics(args[0], args[1]);
    } else if (args.length == 1) {
      listTopics(args[0], args[0]);
    }
  }

  public static void listTopics(String projectId, String project) throws IOException {
    try (TopicAdminClient client = TopicAdminClient.create()) {
      // Construct the parent resource path from the project identifier.
      String parentProject = projectId != null && !projectId.isEmpty() ? projectId : project;
      ProjectName projectName = ProjectName.of(parentProject);

      for (Topic topic : client.listTopics(projectName).iterateAll()) {
        System.out.println("Topic: " + topic.getName());
      }
      System.out.println("Listed topics for project: " + projectName.getProject());
    }
  }
}
// [END pubsub_v1_publisher_topics_list]
