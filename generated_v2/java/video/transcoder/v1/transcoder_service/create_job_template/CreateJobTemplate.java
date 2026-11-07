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

package com.google.cloud.transcoder.v1;

// [START transcoder_v1_transcoderservice_jobtemplate_create]
import com.google.cloud.video.transcoder.v1.AudioStream;
import com.google.cloud.video.transcoder.v1.ElementaryStream;
import com.google.cloud.video.transcoder.v1.JobConfig;
import com.google.cloud.video.transcoder.v1.JobTemplate;
import com.google.cloud.video.transcoder.v1.LocationName;
import com.google.cloud.video.transcoder.v1.MuxStream;
import com.google.cloud.video.transcoder.v1.TranscoderServiceClient;
import com.google.cloud.video.transcoder.v1.VideoStream;
import java.io.IOException;

public class CreateJobTemplate {

  public static void createJobTemplate(String projectId, String locationId, String jobTemplateId)
      throws IOException {
    // Initialize the client that manages Transcoder service interactions.
    try (TranscoderServiceClient client = TranscoderServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      // Configure video and audio streams for the template.
      VideoStream videoStream =
          VideoStream.newBuilder()
              .setH264(
                  VideoStream.H264CodecSettings.newBuilder()
                      .setBitrateBps(1000000)
                      .setFrameRate(60)
                      .setHeightPixels(720)
                      .setWidthPixels(1280)
                      .build())
              .build();

      AudioStream audioStream =
          AudioStream.newBuilder()
              .setCodec("aac")
              .setBitrateBps(64000)
              .build();

      ElementaryStream videoElementaryStream =
          ElementaryStream.newBuilder()
              .setKey("video-stream0")
              .setVideoStream(videoStream)
              .build();

      ElementaryStream audioElementaryStream =
          ElementaryStream.newBuilder()
              .setKey("audio-stream0")
              .setAudioStream(audioStream)
              .build();

      MuxStream muxStream =
          MuxStream.newBuilder()
              .setKey("sd")
              .setContainer("mp4")
              .addElementaryStreams("video-stream0")
              .addElementaryStreams("audio-stream0")
              .build();

      JobConfig jobConfig =
          JobConfig.newBuilder()
              .addElementaryStreams(videoElementaryStream)
              .addElementaryStreams(audioElementaryStream)
              .addMuxStreams(muxStream)
              .build();

      JobTemplate jobTemplate =
          JobTemplate.newBuilder()
              .setConfig(jobConfig)
              .build();

      JobTemplate response = client.createJobTemplate(parent, jobTemplate, jobTemplateId);
      System.out.println("Created job template: " + response.getName());
    }
  }
}
// [END transcoder_v1_transcoderservice_jobtemplate_create]
