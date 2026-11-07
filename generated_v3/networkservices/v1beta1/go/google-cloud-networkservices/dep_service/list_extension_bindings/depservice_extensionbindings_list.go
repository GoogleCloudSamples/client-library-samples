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

// [START networkservices_v1beta1_depservice_extensionbindings_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1beta1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1beta1/networkservicespb"
	"google.golang.org/api/iterator"
)

// Use the ListExtensionBindings method.
func listExtensionBindings(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := networkservices.NewDepClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDepClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.ListExtensionBindingsRequest{
		Parent: parent,
	}

	it := client.ListExtensionBindings(ctx, req)
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListExtensionBindings iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Extension binding: %s\n", resp.GetName())
	}
	fmt.Fprintf(w, "Listed extension bindings.\n")

	return nil
}

// [END networkservices_v1beta1_depservice_extensionbindings_list]
