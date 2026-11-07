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

package main

// [START videointelligence_v1p3beta1_videointelligenceservice_annotate_video]

import (
	"context"
	"fmt"
	"io"

	videointelligence "cloud.google.com/go/videointelligence/apiv1p3beta1"
	videointelligencepb "cloud.google.com/go/videointelligence/apiv1p3beta1/videointelligencepb"
)

// Use the AnnotateVideo method.
func annotateVideo(ctx context.Context, w io.Writer, inputURI string) error {
	features := []videointelligencepb.Feature{
		videointelligencepb.Feature_LABEL_DETECTION,
	}

	client, err := videointelligence.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &videointelligencepb.AnnotateVideoRequest{
		InputUri: inputURI,
		Features: features,
	}

	op, err := client.AnnotateVideo(ctx, req)
	if err != nil {
		return fmt.Errorf("AnnotateVideo: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	for _, result := range resp.GetAnnotationResults() {
		for _, annotation := range result.GetSegmentLabelAnnotations() {
			fmt.Fprintf(w, "Label: %s\n", annotation.GetEntity().GetDescription())
		}
	}

	return nil
}

// [END videointelligence_v1p3beta1_videointelligenceservice_annotate_video]
